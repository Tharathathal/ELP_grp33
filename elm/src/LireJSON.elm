module LireJSON exposing (..)

import Browser
import Http
import Html exposing (Html, div, text)
import Result exposing (Result)
import Json.Decode exposing (..)

-- Main --
main =
  Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }

-- SUBSCRIPTIONS --

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none

--- MODEL --- 
type Model
    = Loading
    | Loaded Word
    | Failed

type alias Phonetic =
    { text : String
    , audio : Maybe String
    }

type alias Definition =
    { definition : String
    , example : String
    , synonyms : List String
    , antonyms : List String
    }

type alias Meaning =
    { partOfSpeech : String
    , definitions : List Definition
    }

type alias Word =
    { word : String
    , phonetic : String
    , phonetics : List Phonetic
    , origin : String
    , meanings : List Meaning
    }

init : () -> (Model, Cmd Msg)
init _ =
    (Loading, fetchWord)

decodePhonetic : Decoder Phonetic
decodePhonetic =
    map2 Phonetic
        (field "text" string)
        (field "audio" (nullable string))

decodeDefinition : Decoder Definition
decodeDefinition =
    map4 Definition
        (field "definition" string)
        (field "example" string)
        (field "synonyms" (list string))
        (field "antonyms" (list string))

decodeMeaning : Decoder Meaning
decodeMeaning =
    map2 Meaning
        (field "partOfSpeech" string)
        (field "definitions" (list decodeDefinition))

decodeWord : Decoder Word
decodeWord =
    map5 Word
        (field "word" string)
        (field "phonetic" string)
        (field "phonetics" (list decodePhonetic))
        (field "origin" string)
        (field "meanings" (list decodeMeaning))

type Msg
    = FetchWord
    | ReceiveWord (Result Http.Error Word)

--- LIEN QUI RECUPERE LE JSON ---
fetchWord : Cmd Msg
fetchWord = 
    Http.get
        { url = "https://api.dictionaryapi.dev/api/v2/entries/en/hello"
        , expect = Http.expectJson ReceiveWord decodeWord
        }

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        FetchWord ->
            (Loading,fetchWord)
        ReceiveWord result ->
          case result of 
            Ok word ->
                (Loaded word,Cmd.none)
            Err _ ->
                (Failed, Cmd.none)


view : Model -> Html Msg
view model =
  case model of
    Loading ->
      div [] [ text "Chargement..." ]
    Loaded word ->
      -- Utilisez les données word pour afficher ce que vous voulez
      div [] [ text "Données chargées:", text (word.word) ]
    Failed ->
      div [] [ text "Échec du chargement des données" ]







