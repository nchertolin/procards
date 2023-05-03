import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {EditorCardsService} from '../services/editorCardsService';
import {getErrorDataWithoutUserId, notifySuccess} from "../util";
import {tryRefreshToken, tryRefreshTokenWithoutAction} from "../services/authService";


const useEditorDeck = (id, searchQuery) => {

    const {isLoading, data, refetch} = useQuery(
        ['editor-deck', id, searchQuery],
        async () => await EditorCardsService.getCards(id, searchQuery),
        {
            onError: error => tryRefreshToken(error, refetch),
            keepPreviousData: true
        },
    );

    return {isLoading, data}
};

const useCreateCard = (setOpened) => {
    const queryClient = useQueryClient();

    const {isLoading, mutateAsync: createCard} = useMutation(
        async (data) => await EditorCardsService.createCard(data),
        {
            onSuccess: cardId => {
                notifySuccess('Карточка добавлена');
                queryClient.invalidateQueries(['editor-deck']);
                setOpened(false);
                return cardId;
            },
            onError: tryRefreshTokenWithoutAction
        }
    );

    return {isLoading, createCard};
};

const useEditCard = (setOpened) => {
    const queryClient = useQueryClient();

    const {isLoading, mutateAsync: editCard} = useMutation(
        async (data) => await EditorCardsService.editCard(data),
        {
            onSuccess: status => {
                notifySuccess('Карточка изменена');
                queryClient.invalidateQueries(['editor-deck']);
                setOpened(false)
                return status
            },
            onError: tryRefreshTokenWithoutAction
        }
    );

    return {isLoading, editCard};
};

const useDeleteCard = (setOpened) => {
    const queryClient = useQueryClient();

    const {isLoading, mutate: deleteCard} = useMutation(
        async (data) => await EditorCardsService.deleteCard(data),
        {
            onSuccess: () => {
                notifySuccess('Карточка удалена');
                queryClient.invalidateQueries(['editor-deck']);
                setOpened(false);
            },
            onError: error =>
                tryRefreshToken(
                    error,
                    null,
                    () => deleteCard(getErrorDataWithoutUserId(error).cardId)
                )
        }
    );

    return {isLoading, deleteCard};
};

const useImage = () => {
    const queryClient = useQueryClient();

    const {isLoading, mutate: addImage} = useMutation(
        async (data) => await EditorCardsService.addImage(data),
        {
            onSuccess: () => queryClient.invalidateQueries(['editor-deck']),
            onError: error => tryRefreshToken(
                error,
                null,
                () => addImage(getErrorDataWithoutUserId(error))
            )
        }
    );

    return {isLoading, addImage};
};

const useImageDelete = toggleText => {
    const queryClient = useQueryClient();

    const {isLoading, mutate: deleteImage} = useMutation(
        async (data) => await EditorCardsService.deleteImage(data),
        {
            onSuccess: side => {
                notifySuccess('Изображение удалено');
                queryClient.invalidateQueries(['editor-deck']);
                toggleText(side);
            },
            onError: error => tryRefreshToken(
                error,
                null,
                () => deleteImage(getErrorDataWithoutUserId(error))
            )
        }
    );

    return {isLoading, deleteImage};
};

export {
    useEditorDeck,
    useCreateCard,
    useEditCard,
    useDeleteCard,
    useImage,
    useImageDelete
};