from fastapi import WebSocketDisconnect


class Game:
    player_symbols = ['X', 'O']

    def __init__(self):
        self.board = [[None, None, None], [None, None, None], [None, None, None]]
        self.players = []
        self.current_turn = 0

    def add_player(self, player):
        if len(self.players) < 2:
            self.players.append(player)

        else:
            raise WebSocketDisconnect(4000, "Only two players are allowed.")

    def remove_player(self, player):
        if player in self.players:
            self.players.remove(player)

    def make_move(self, player, row, col):
        if player == self.players[self.current_turn] and self.board[row][col] is None:
            self.board[row][col] = self.player_symbols[self.current_turn]
            self.current_turn = (self.current_turn + 1) % 2

    def check_win(self):
        for row in self.board:
            if row[0] == row[1] == row[2] and row[0] is not None:
                return row[0]

        for col in range(3):
            if self.board[0][col] == self.board[1][col] == self.board[2][col] and self.board[0][col] is not None:
                return self.board[0][col]

        if self.board[0][0] == self.board[1][1] == self.board[2][2] and self.board[0][0] is not None:
            return self.board[0][0]
        if self.board[0][2] == self.board[1][1] == self.board[2][0] and self.board[0][2] is not None:
            return self.board[0][2]

        return None


game = Game()
