-- https://api.dictionaryapi.dev/api/v2/entries/en/<word> 

module Projet exposing (..)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Http 
import Random



-- MAIN

main =
  Browser.element { init = init, subscriptions = subscriptions, update = update, view = view }



-- MODEL

type alias Model = String

init : () -> (Model, Cmd msg)
init _ =
  (Loading, Http.get {url = "../static/mots.txt"})


-- SUBSCRIPTIONS



-- UPDATE

type Msg
  = NewWord

update : Msg -> Model -> (Model, Cmd msg)
update msg model =
  case msg of
    NewWord ->
      (Loading, Http.get {url = "../static/mots.txt"})



-- VIEW

view : Model -> Html Msg
view model =
  div []
    [ div [] [ text (model) ]
    , button [ onClick NewWord ] [ text "Nouveau mot" ]
    ]