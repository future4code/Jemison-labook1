import { CustomError } from "./CustomError";

export class EmptyRequester extends CustomError {
    constructor() {
        super(422, "O campo 'Requester'(Solicitante) é um campo obrigatório. Tente novamente.")
    }
}

export class EmptyReceiver extends CustomError {
    constructor() {
        super(422, "O campo 'Receiver'(Solicitado) é um campo obrigatório. Tente novamente.")
    }
}

export class EmptyFields extends CustomError {
    constructor() {
        super(400, "Por favor, preencha os campos obrigatórios e tente novamente.")
    }
}

export class FriendshipNotFound extends CustomError {
    constructor() {
        super(404, "Desculpe. Acho que tropeçamos numa oportunidade. Não foi possível localizar a amizade, pois vocês ainda não são amigos. Que tal fazer essa amizade agora?")
    }
}

export class CannotDeleteFriendshipNotFound extends CustomError {
    constructor() {
        super(404, "Desculpe. Acho que tropeçamos numa oportunidade. Não foi possível desfazer a amizade, pois vocês ainda não são amigos. Que tal fazer essa amizade agora?")
    }
}