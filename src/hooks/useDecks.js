import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {LearningDeckService} from '../services/learningDecksService'
import {redirectToLearn} from '../utils';

const useDecks = (searchQuery) => {
    const {isLoading, data} = useQuery(
        ['decks', searchQuery],
        async () => await LearningDeckService.getDecks(searchQuery),
        {
            keepPreviousData: true,
        },
    );

    return {isLoading, data}
}

const useRemoveDeckFromLatest = () => {
    const queryClient = useQueryClient();
    const {isLoading, mutate: removeDeckFromLatest} = useMutation(
        async (deckId) => await LearningDeckService.deleteDeck(deckId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['decks']);
                redirectToLearn();
            }
        },
    );

    return {isLoading, removeDeckFromLatest}
}

export {useDecks, useRemoveDeckFromLatest};
