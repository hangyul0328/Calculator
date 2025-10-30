from tkinter import *

class Calculator:
    def __init__(self, master):
        self.master = master
        master.title("계산기")

        self.result_var = StringVar()
        self.result_var.set("0")

        self.result_label = Label(master, textvariable=self.result_var, height=5, anchor='e', font=('Arial', 12))
        self.result_label.grid(row=0, column=0, columnspan=4, sticky='nsew')

        self.create_buttons()

    def btn_click(self, value):
        current_text = self.result_var.get()

        if value == '=':
            try:
                # 'eval' is used for simplicity, but can be a security risk in production code
                final_result = str(eval(current_text))
                self.result_var.set(final_result)
            except Exception as e:
                self.result_var.set("Error")
        elif value == 'c':
            self.result_var.set("0")
        else:
            if current_text == "0" and value != '.':
                self.result_var.set(value)
            else:
                self.result_var.set(current_text + value)

    def create_buttons(self):
        button_layout = [
            ['7', '8', '9', '/'],
            ['4', '5', '6', '*'],
            ['1', '2', '3', '-'],
            ['0', 'c', '=', '+']
        ]

        for i, row in enumerate(button_layout):
            for j, text in enumerate(row):
                btn = Button(self.master, text=text, width=5, height=2, command=lambda t=text: self.btn_click(t))
                btn.grid(row=i + 1, column=j, sticky='nsew')

        # Configure grid weights to make buttons resize with the window
        for i in range(5):
            self.master.grid_rowconfigure(i, weight=1)
        for i in range(4):
            self.master.grid_columnconfigure(i, weight=1)


if __name__ == "__main__":
    root = Tk()
    app = Calculator(root)
    root.mainloop()
