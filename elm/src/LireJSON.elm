module LireJSON exposing (..)

import Browser
import Html exposing (Html, div, text)
import Json.Decode exposing (Decoder, field, string, list, object2, object4, object5, maybe, oneOf, (:=))
import Result exposing (Result)


-- Définition des types de données
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


-- Décodeurs
phoneticDecoder : Decoder Phonetic
phoneticDecoder =
    object2 Phonetic
        ("text" := string)
        ("audio" := maybe string)

definitionDecoder : Decoder Definition
definitionDecoder =
    object4 Definition
        ("definition" := string)
        ("example" := string)
        ("synonyms" := list string)
        ("antonyms" := list string)

meaningDecoder : Decoder Meaning
meaningDecoder =
    object2 Meaning
        ("partOfSpeech" := string)
        ("definitions" := list definitionDecoder)

wordDecoder : Decoder Word
wordDecoder =
    object5 Word
        ("word" := string)
        ("phonetic" := string)
        ("phonetics" := list phoneticDecoder)
        ("origin" := string)
        ("meanings" := list meaningDecoder)


-- Messages
type Msg
    = DataReceived (Result String Word)


-- Vue
view : Word -> Html Msg
view model =
    div []
        [ text ("Mot: " ++ model.word)
        , text ("Phonétique: " ++ model.phonetic)
        , text ("Origine: " ++ model.origin)
        -- Ajoutez ici le rendu des autres données selon vos besoins
        ]


-- Mise à jour
update : Msg -> Word -> (Word, Cmd Msg)
update msg model =
    case msg of
        DataReceived (Ok wordData) ->
            (wordData, Cmd.none)

        DataReceived (Err errorMessage) ->
            -- Gérer les erreurs, par exemple, afficher un message d'erreur
            (model, Cmd.none)


-- Élément Elm
wordElement : Browser.Element Msg
wordElement =
    { init = \_ -> (init, Cmd.none)
    , update = update
    , subscriptions = \_ -> Sub.none
    , view = view
    }


-- Ports
port module exposing (DataReceived)

port loadWordData : String -> Cmd Msg




