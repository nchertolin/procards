import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {EditorDeckService} from '../services/editorDecksService';
import {getErrorDataWithoutUserId, notifySuccess} from "../util";
import {tryRefreshToken} from "../services/authService";


const useEditorDecks = (searchQuery) => {
    const {isLoading, data, refetch} = useQuery(
        ['editor-decks', searchQuery],
        async () => await EditorDeckService.getDecks(searchQuery),
        {
            onError: error => tryRefreshToken(error, refetch),
            keepPreviousData: true,
        },
    );

    return {isLoading, data}
};

const useCreateDeck = (reset, setOpened) => {
    const queryClient = useQueryClient();

    const {isLoading, mutateAsync: createDeck} = useMutation(
        async (data) => await EditorDeckService.createDeck(data),
        {
            onSuccess: deckId => {
                notifySuccess('Колода добавлена');
                queryClient.invalidateQueries(['editor-decks']);
                setOpened(false)
                reset();
                return deckId;
            },
            onError: error => tryRefreshToken(
                error,
                null,
                () => createDeck(getErrorDataWithoutUserId(error))
            )
        }
    );

    return {isLoading, createDeck};
};

const useEditDeck = (setOpened) => {
    const queryClient = useQueryClient();

    const {isLoading, mutate: editDeck} = useMutation(
        async (data) => await EditorDeckService.editDeck(data),
        {
            onSuccess: () => {
                notifySuccess('Колода изменена');
                queryClient.invalidateQueries(['editor-decks']);
                setOpened(false);
            },
            onError: error => tryRefreshToken(
                error,
                null,
                () => editDeck(getErrorDataWithoutUserId(error))
            )
        }
    );

    return {isLoading, editDeck};
};

const useEditDeckPassword = (setOpened) => {
    const queryClient = useQueryClient();

    const {isLoading, mutate: editPassword} = useMutation(
        async (data) => await EditorDeckService.editDeckPassword(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['editor-decks']);
                setOpened(false);
            },
            onError: error => tryRefreshToken(
                error,
                null,
                () => editPassword(getErrorDataWithoutUserId(error))
            )
        }
    );

    return {isLoading, editPassword};
};

const useDeleteDeck = (setOpened) => {
    const queryClient = useQueryClient();

    const {isLoading, mutate: deleteDeck} = useMutation(
        async (data) => await EditorDeckService.deleteDeck(data),
        {
            onSuccess: () => {
                notifySuccess('Колода удалена');
                queryClient.invalidateQueries(['editor-decks']);
                setOpened(false);
            },
            onError: error => {
                tryRefreshToken(
                    error,
                    null,
                    () => deleteDeck(getErrorDataWithoutUserId(error).deckId)
                )
            }
        }
    );

    return {isLoading, deleteDeck};
};

export {useEditorDecks, useCreateDeck, useEditDeck, useDeleteDeck, useEditDeckPassword};
