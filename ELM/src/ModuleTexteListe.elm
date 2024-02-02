module ModuleTexteListe exposing (..)

import Html exposing (Html)
import Http
import List.Extra exposing (getAt)
import Random exposing (Generator, generate, int)
import ModulesLireJSON exposing (Word)


type Msg
    = Data (Result Http.Error (List Word))
    | DataReceived (Result Http.Error String)
    | Guess String

tirerMotAuHasard : List String -> Generator (Maybe String)
tirerMotAuHasard listeMots =
    let
        indexMax = List.length listeMots
        generateurIndex = Random.int 0 (indexMax - 1)
    in
    if indexMax == 0 then
        Random.constant Nothing
    else
        Random.map (\index -> getAt index listeMots) generateurIndex

separerMots : String -> List String
separerMots texte =
    String.split " " texte


getWords : Cmd Msg
getWords =
    Http.get
        { url = "http://localhost:5018/mots.txt"
        , expect = Http.expectString DataReceived
        }