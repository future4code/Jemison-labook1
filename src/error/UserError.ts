import { CustomError } from "./CustomError";

export class EmptyName extends CustomError {
    constructor() {
        super(422, "O campo 'Nome' é um campo obrigatório. Tente novamente.")
    }
}

export class EmptyEmail extends CustomError {
    constructor() {
        super(422, "O campo 'Email' é um campo obrigatório. Tente novamente.")
    }
}

export class EmptyPassword extends CustomError {
    constructor() {
        super(422, "Uma senha é necessária para concluir a criação da sua conta. Tente novamente.")
    }
}

export class PasswordTooShort extends CustomError {
    constructor() {
        super(422, "Sua senha não atende aos requisitos mínimos: pelo menos 8 caracteres.")
    }
}

export class InvalidEmail extends CustomError {
    constructor() {
        super(422, "Seu e-mail não é válido. Tente novamente.")
    }
}

export class EmptyFields extends CustomError {
    constructor() {
        super(400, "Por favor, preencha todos os campos e tente novamente.")
    }
}

export class NoUserFound extends CustomError {
    constructor() {
        super(404, "Que vazio por aqui. Não encontrei nenhum usuário.")
    }
}