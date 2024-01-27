module RandomWord exposing (tirerMotAuHasard, randomGeneratorToString)

import Random
import List.Extra exposing (getAt)

tirerMotAuHasard : List String -> Random.Generator (Maybe String)
tirerMotAuHasard listeMots =
    let
        indexMax = List.length listeMots
        generateurIndex = Random.int 0 (indexMax - 1)
    in
    if indexMax == 0 then
        Random.constant Nothing
    else
        Random.map (\index -> getAt index listeMots) generateurIndex

randomGeneratorToString : Random.Generator (Maybe String) -> String
randomGeneratorToString generator =
    case Random.generate (\_ -> generator) (Random.initialSeed 0) of
        (result, _) ->
            case result of
                Just str ->
                    str

                Nothing ->
                    "Pas de valeur"