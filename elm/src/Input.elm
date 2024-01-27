module Input exposing (..)

import Html exposing (Html, div, input, text)
import Html.Attributes exposing (placeholder)
import Html.Events exposing (onInput)
import Browser


type alias Model =
    { userInput : String
    , comparisonWord : String
    }


init : () -> (Model, Cmd Msg)
init _ =
    ( { userInput = ""
      , comparisonWord = "example"
      }
    , Cmd.none
    )


type Msg
    = UpdateUserInput String


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        UpdateUserInput input ->
            ( { model | userInput = input }
            , Cmd.none
            )


view : Model -> Html Msg
view model =
    div []
        [ input [ placeholder "Enter a word", onInput UpdateUserInput ] []
        , text (if model.userInput == model.comparisonWord then "Match!" else "No match.")
        ]


main : Program () Model Msg
main = Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }
