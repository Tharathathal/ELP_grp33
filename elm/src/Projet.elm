module Projet exposing (..)

import Browser
import Html exposing (Html, div, button, text, pre)
import Html.Events exposing (onClick)
import Http
import Random
import LireJSON exposing (view)


-- MAIN


main =
  Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }



-- MODEL


type Model = Failure | Loading | Success String


init : () -> (Model, Cmd Msg)
init _ =
  (Loading, Http.get
      {url = "https://elm-lang.org/api/random-quotes"
      , expect = Http.expectString GotDef})



-- UPDATE


type Msg
  = GotDef (Result Http.Error String) | NewDef

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    GotDef result ->
      case result of 
        Ok fullText ->
          (Success fullText, Cmd.none)
        
        Err _ ->
          (Failure, Cmd.none)

    NewDef -> 
          (Loading, Http.get { url = "https://api.dictionaryapi.dev/api/v2/entries/en/bye", expect = Http.expectString GotDef })



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none



-- VIEW


view : Model -> Html Msg
view model =
  case model of 
    Failure ->
      text "Fail"

    Loading ->
      text "Loading"

    Success def ->
      div []
        [ text def 
                , button [ onClick NewDef] [ text "Nouvelle définition" ]
        ]        