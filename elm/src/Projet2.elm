module Projet2 exposing (..)

import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)
import List.Extra exposing (getAt)
import Http
import Random
import Browser
import ModulesLireJSON exposing (Word, Phonetic, Meaning, Definition, decoder, viewWords)
import Http exposing (get)

-- http-server server -a localhost -p 5018 --cors

type alias Model =
    { result : Result Http.Error (List Word)
    , result1 : Result Http.Error String
    , userInput : String
    , motGenere : Maybe String
    , showWord : Maybe String
    }


-- MESSAGES
type Msg
    = Data (Result Http.Error (List Word))
    | DataReceived (Result Http.Error String)
    | Guess String
    | MotGenere (Maybe String)
    | ShowWord (Maybe String)
    

-- INIT
init : () -> (Model, Cmd Msg)
init _ =
        ( { result = Err Http.NetworkError
            , result1 = Err Http.NetworkError
            , userInput = ""
            , motGenere = Nothing
            , showWord = Nothing
            }
        , getWords
        )
getWords : Cmd Msg
getWords =
    Http.get
        { url = "http://localhost:5018/mots.txt"
        , expect = Http.expectString DataReceived
        }

getDefinition : String -> Cmd Msg
getDefinition word =
    Http.get
        { url = "https://api.dictionaryapi.dev/api/v2/entries/en/" ++ word
        , expect = Http.expectJson Data decoder
        }
    

tirerMotAuHasard : List String -> Random.Generator (Maybe String)
tirerMotAuHasard listeMots =
    let
        indexMax = List.length listeMots
        generateurIndex = Random.int 0 (indexMax - 1)
    in
    if indexMax == 0 then
        Random.constant Nothing
    else
        Random.map (\index -> getAt index listeMots) generateurIndex

errorToString : Http.Error -> String
errorToString error =
    case error of
        Http.BadUrl url ->
            "The URL " ++ url ++ " was invalid"
        Http.Timeout ->
            "Unable to reach the server, try again"
        Http.NetworkError ->
            "Unable to reach the server, check your network connection"
        Http.BadStatus 500 ->
            "The server had a problem, try again later"
        Http.BadStatus 400 ->
            "Verify your information and try again"
        Http.BadStatus x ->
            "Unknown error with status " ++ String.fromInt x
        Http.BadBody errorMessage ->
            errorMessage

-- UPDATE
update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        MotGenere mot ->
            ({ model | motGenere = mot }, getDefinition (Maybe.withDefault "" mot))
        DataReceived (Ok data) ->
            let
                mots = String.split " " data
                generateur = tirerMotAuHasard mots
            in
            ( model, Random.generate MotGenere generateur )

        DataReceived (Err error) ->
            ({ model | result1 = Err error }, Cmd.none)
        
        Data (Ok newData) ->
            ({ model | result = Ok newData }, Cmd.none)

        Data (Err error) ->
            ({ model | result = Err error }, Cmd.none)       

        Guess input ->
            ( { model | userInput = input }
            , Cmd.none)
            
        ShowWord word->
            ( { model | showWord = word} , Cmd.none)
-- VIEW
view : Model -> Html Msg
view model =
    case model.result of
        Err error ->
            text ("Error: " ++ errorToString error)

        Ok newData ->
            div []
                [ div [] [ viewWords newData ]
                , viewGuessInput model
                ]
viewGuessInput : Model -> Html Msg
viewGuessInput model =
    case model.motGenere of
            Just mot ->
                div []
                    [ input [ placeholder "Enter a word", onInput Guess ] []
                    , text (if model.userInput == mot then "Bien Joué!" else "Aurez vous la répoooonse?")
                    , div[] [button [ onClick (ShowWord model.motGenere) ] [ text "On abandonne :(" ]]
                    , viewMotGenere model
                    ]
            Nothing ->
                text "Aucun mot généré"
    
viewMotGenere : Model -> Html Msg
viewMotGenere model =
    case model.showWord of
        Just mot ->
            div []
                [ text ("Solution: " ++ mot)
                ]
        Nothing ->
            text "On ne triche pas :)"

viewWords : List Word -> Html Msg
viewWords words =
    case words of
        [] ->
            div [] [ text "No data available." ]

        (word :: _) ->
            div []
                [ h1 [] [text "Guess the word!"]
                , ul[] [ viewMeanings word.meanings]
                ]
viewPhonetics : List Phonetic -> Html Msg
viewPhonetics phonetics =
    div []
        (List.map
            (\ph ->
                div []
                    [ text ("Audio: " ++ Maybe.withDefault "N/A" ph.audio)
                    ]
            )
            phonetics
        )

viewMeanings : List Meaning -> Html Msg
viewMeanings meanings =
    div []
        (List.map
            (\m ->
                div []
                    [ viewDefinitions m.definitions
                    ]
            )
            meanings
        )

viewDefinitions : List Definition -> Html Msg
viewDefinitions definitions =
    div []
        (List.map
            (\d ->
                div []
                    [ li [] [ text ("Definition: " ++ d.definitions) ]
                    ]
            )
            definitions
        )

-- DECODER

main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
