module ModulesLireJSON exposing (..)


import Html exposing (Html, div, text, li)
import Http
import Json.Decode exposing (Decoder, field, list, map, map2, map3, nullable, string)
import Result exposing (Result)

type Msg
    = Data (Result Http.Error (List Word))
    | DataReceived (Result Http.Error String)
    | Guess String
-- MODEL
type alias Word =
    { word : String
    , phonetics : List Phonetic
    , meanings : List Meaning
    }

type alias Phonetic =
    { audio : Maybe String
    }

type alias License = 
    { name : Maybe String
    , url : Maybe String
    }

type alias Definition =
    { definitions : String
    , synonyms : List String
    , antonyms : List String
    }

type alias Meaning =
    { partOfSpeech : String
    , definitions : List Definition
    }

getDefinition : String ->  Cmd Msg
getDefinition word =
    Http.get
        { url = "https://api.dictionaryapi.dev/api/v2/entries/en/" ++ word
        , expect = Http.expectJson Data decoder
        }

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

-- VIEW
viewWords : List Word -> Html Msg
viewWords words =
    case words of
        [] ->
            div [] [ text "No data available." ]
        
        (word :: _) ->
            div []
                [viewMeanings word.meanings
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
                    [  viewDefinitions m.definitions 
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
                    [ li [] [text ("Definition: " ++  d.definitions)]
                    ]
            )
            definitions
        )

-- DECODER
decoder : Decoder (List Word)
decoder =
    list decoderWord

decoderWord : Decoder Word
decoderWord =
    map3 Word
        (field "word" string)
        (field "phonetics" (list decoderPhonetic))
        (field "meanings" (list decoderMeaning))
        

decoderPhonetic : Decoder Phonetic
decoderPhonetic =
    map Phonetic
        (field "audio" (nullable string))

decoderLicense : Decoder License
decoderLicense = 
    map2 License
        (field "name" (nullable string))
        (field "url"(nullable string))        

decoderDefinition : Decoder Definition
decoderDefinition =
    map3 Definition
        (field "definition" string)
        (field "synonyms" (list string))
        (field "antonyms" (list string))
        

decoderMeaning : Decoder Meaning
decoderMeaning =
    map2 Meaning
        (field "partOfSpeech" string)
        (field "definitions" (list decoderDefinition))
