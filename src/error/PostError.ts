import { CustomError } from "./CustomError";

export class NoPhoto extends CustomError {
    constructor() {
        super(422, "Não é possível publicar o Post sem uma foto.")
    }
}

export class EmptyDescription extends CustomError {
    constructor() {
        super(422, "O campo 'Descrição' é um campo obrigatório. Tente novamente.")
    }
}

export class NoAuthor extends CustomError {
    constructor() {
        super(422, "Não é possível publicar o Post sem o ID do usuário.")
    }
}

export class EmptyFields extends CustomError {
    constructor() {
        super(400, "Por favor, preencha os campos obrigatórios e tente novamente.")
    }
}

export class PostNotFound extends CustomError {
    constructor() {
        super(404, "Opa! Isso nunca me aconteceu, eu juro. Não encontrei seu post. :/")
    }
}