module ModuleInput exposing (..)

import Html exposing (Html, div, input, text)
import Html.Attributes exposing (placeholder)
import Html.Events exposing (onInput)
import Browser

viewInput : Model -> Html Msg
viewInput model =
    div []
        [ input [ placeholder "Enter a word", onInput UpdateUserInput ] []
        , text (if model.userInput == model.comparisonWord then "Match!" else "No match.")
        ]

