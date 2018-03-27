port module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


port rageQuit : () -> Cmd msg


type alias Model =
    Int


type Msg
    = RageQuit


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        RageQuit ->
            ( 1, rageQuit () )


view : Model -> Html Msg
view model =
    button [ class "clear-completed", buttonStyles, onClick RageQuit ] [ text "Rage quit" ]


buttonStyles =
    style
        [ ( "margin-right", "8px" )
        , ( "background", "red" )
        , ( "color", "white" )
        , ( "font-weight", "bold" )
        , ( "padding", "2px" )
        , ( "text-transform", "uppercase" )
        , ( "border-radius", "3px" )
        ]


main =
    program
        { update = update
        , view = view
        , init = ( 1, Cmd.none )
        , subscriptions = always Sub.none
        }
