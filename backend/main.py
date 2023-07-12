from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from game import game

app = FastAPI()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    try:
        game.add_player(websocket)
    except WebSocketDisconnect as e:
        await websocket.close(code=e.code, reason=e.reason)
        return

    if len(game.players) == 2:
        game_state = {
            "board": game.board,
            "currentPlayer": game.player_symbols[0],
            "winner": game.check_win()
        }
        for player in game.players:
            await player.send_json(game_state)

    try:
        while True:
            data = await websocket.receive_json()
            row = data["row"]
            col = data["col"]
            game.make_move(websocket, row, col)
            winner = game.check_win()
            game_state = {
                "board": game.board,
                "currentPlayer": game.player_symbols[game.current_turn],
                "winner": winner
            }
            for player in game.players:
                await player.send_json(game_state)

    except WebSocketDisconnect:
        game.remove_player(websocket)
