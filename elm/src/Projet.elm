-- https://api.dictionaryapi.dev/api/v2/entries/en/<word> 

module Main exposing (..)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)



-- MAIN

main =
  Browser.sandbox { init = init, update = update, view = view }



-- MODEL

type alias Model = String

init : Model
init =
  " "



-- UPDATE

type Msg
  = NewWord

update : Msg -> Model -> Model
update msg model =
  case msg of
    NewWord ->
        mot



-- VIEW

view : Model -> Html Msg
view model =
  div []
    [ div [] [ text (model) ]
    , button [ onClick NewWord ] [ text "Nouveau mot" ]
    ]