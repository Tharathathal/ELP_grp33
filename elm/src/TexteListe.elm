module TexteListe exposing (..)

import Browser
import Html exposing (..)
import Html.Events exposing (onClick)
import Http
import List.Extra exposing (getAt)
import Random exposing (..)

type alias Model =
    { motGenere : Maybe String
    }

type Msg
    = MotGenere (Maybe String)
    | DataReceived (Result Http.Error String)

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
update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        MotGenere mot ->
            ( { model | motGenere = mot }, Cmd.none )
        DataReceived (Ok data) ->
            let
                mots = String.split " " data -- Supposons que les mots sont séparés par des espaces
                generateur = tirerMotAuHasard mots
            in
            ( model, Random.generate MotGenere generateur )
        DataReceived (Err _) ->
            ( model, Cmd.none )
getNicknames : Cmd Msg
getNicknames =
    Http.get
        { url = "http://localhost:5018/mots.txt"
        , expect = Http.expectString DataReceived
        }

init : () -> (Model, Cmd Msg)
init _ =
    ( { motGenere = Nothing }, getNicknames )

view : Model -> Html Msg
view model =
    case model.motGenere of
        Just mot ->
            text mot
        Nothing ->
            text "Aucun mot généré"

main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
