module RandomWord exposing(..)

import Browser
import Html exposing (..)
import Html.Events exposing (onClick)
import List exposing (head, tail)
import Random exposing (..)


-- Type de modèle
type alias Model =
    { words : List String
    , selectedWord : Maybe String
    , randomGenerator : Generator (Maybe String)
    }


-- Messages
type Msg
    = RandomWordGenerated (Maybe String)
    | GenerateRandomWord


-- Fonction principale qui charge le fichier JSON et décode les données
main =
    Browser.sandbox { init = init, update = update, view = view }


-- Modèle initial
init : Model
init =
    { words = ["apple", "banana", "cherry", "date", "elderberry"]
    , selectedWord = Nothing
    , randomGenerator = Random.initialSeed 42 |> Random.generate generateRandomWord
    }


-- Mise à jour du modèle
update : Msg -> Model -> Model
update msg model =
    case msg of
        RandomWordGenerated maybeWord ->
            { model | selectedWord = maybeWord }

        GenerateRandomWord ->
            let
                (newWord, newGenerator) =
                    Random.step generateRandomWord model.randomGenerator
            in
            { model | selectedWord = newWord, randomGenerator = newGenerator }


-- Vue
view : Model -> Html Msg
view model =
    div []
        [ button [ onClick GenerateRandomWord ] [ text "Générer un mot au hasard" ]
        , case model.selectedWord of
            Just word ->
                text ("Mot sélectionné : " ++ word)

            Nothing ->
                text "Aucun mot sélectionné"
        ]


-- Générateur pour choisir un mot au hasard dans la liste
generateRandomWord : Step (Maybe String)
generateRandomWord =
    List.isEmpty >> Random.step (Maybe.withDefault "" << head << tail)
