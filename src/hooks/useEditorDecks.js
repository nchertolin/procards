import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {EditorDeckService} from '../services/editorDecksService';
import {notifySuccess} from "../utils";


const useEditorDecks = (searchQuery) => {
    const {isLoading, data} = useQuery(
        ['editor-decks', searchQuery],
        async () => await EditorDeckService.getDecks(searchQuery),
        {
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
            }
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
            }
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
            }
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
            }
        }
    );

    return {isLoading, deleteDeck};
};

export {useEditorDecks, useCreateDeck, useEditDeck, useDeleteDeck, useEditDeckPassword};
