import { CustomError } from "./CustomError";

export class EmptyLikeUser extends CustomError {
    constructor() {
        super(422, "O campo 'User' é um campo obrigatório. Tente novamente.")
    }
}

export class EmptyPost extends CustomError {
    constructor() {
        super(422, "O campo 'Post' é um campo obrigatório. Tente novamente.")
    }
}

export class EmptyFields extends CustomError {
    constructor() {
        super(400, "Por favor, preencha os campos obrigatórios e tente novamente.")
    }
}

export class LikedPostNotFound extends CustomError {
    constructor() {
        super(404, "Opa! Não consegui encontrar esse post em suas interações.")
    }
}

export class PostAlreadyLiked extends CustomError {
    constructor() {
        super(403, "Não é possível curtir o mesmo post duas vezes. Continue rolando seu feed, que você vai encontrar mais coisas para curtir.")
    }
}