port module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode
import Json.Encode

port outgoing : Json.Encode.Value -> Cmd msg

port incoming : (Json.Encode.Value -> msg) -> Sub msg


type alias Model =
    Int


type Msg
    = RageQuit
    | Incoming Json.Encode.Value


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        RageQuit ->
            ( 1, outgoing <| Json.Encode.int 1 )
        Incoming data ->
            ( 1, Cmd.none )


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
    programWithFlags
        { update = update
        , view = view
        , init = (\n -> ( n, Cmd.none ))
        , subscriptions = always Sub.none
        }
