module RandomWord exposing(..)

import Random

oneToTen : Random.Generator Int
oneToTen =
  Random.int 1 10
