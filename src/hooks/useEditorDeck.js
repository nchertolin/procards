import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {EditorCardsService} from '../services/editorCardsService';
import {ImagesService} from "../services/imagesService";
import {notifySuccess} from "../js/utils";


const useEditorDeck = (id, searchQuery) => {

    const {isLoading, data} = useQuery(
        ['editor-deck', id, searchQuery],
        async () => await EditorCardsService.getCards(id, searchQuery),
        {
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
            }
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
            }
        }
    );

    return {isLoading, deleteCard};
};

const useImage = () => {
    const queryClient = useQueryClient();

    const {isLoading, mutate: addImage} = useMutation(
        async (data) => await ImagesService.addImage(data),
        {
            onSuccess: () => queryClient.invalidateQueries(['editor-deck'])
        }
    );

    return {isLoading, addImage};
};

const useImageDelete = toggleText => {
    const queryClient = useQueryClient();

    const {isLoading, mutate: deleteImage} = useMutation(
        async (data) => await ImagesService.deleteImage(data),
        {
            onSuccess: side => {
                notifySuccess('Изображение удалено');
                queryClient.invalidateQueries(['editor-deck']);
                toggleText(side);
            }
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
