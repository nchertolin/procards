import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {LearningDeckService} from '../services/learningDecksService'
import {getErrorDataWithoutUserId, redirectToLearn} from '../util';
import {tryRefreshToken} from "../services/authService";


const useDecks = (searchQuery) => {
    const {isLoading, data, refetch} = useQuery(
        ['decks', searchQuery],
        async () => await LearningDeckService.getDecks(searchQuery),
        {
            onError: error => tryRefreshToken(error, refetch),
            keepPreviousData: true
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
            },
            onError: error =>
                tryRefreshToken(
                    error,
                    null,
                    () => removeDeckFromLatest(getErrorDataWithoutUserId(error).deckId)
                )
        },
    );

    return {isLoading, removeDeckFromLatest}
}

export {useDecks, useRemoveDeckFromLatest};