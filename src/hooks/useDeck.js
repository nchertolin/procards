import {QueryClient, useMutation, useQuery} from '@tanstack/react-query'
import {LearningDeckService} from '../services/learningDecksService';
import {LearningCardsService} from '../services/learningCardsService';
import {getErrorDataWithoutUserId, redirectToLearn} from "../util";
import {tryRefreshToken} from "../services/authService";


const useDeck = id => {
    const {isLoading, data, refetch} = useQuery(
        ['deck-name', id],
        async () => await LearningDeckService.getDeck(id),
        {
            onError: error => tryRefreshToken(error, refetch)
        },
    );

    return {isLoading, data}
};

const useCards = id => {
    const {isLoading, data, refetch: getNewCards} = useQuery(
        ['deck', id],
        async () => await LearningCardsService.getCards(id),
        {
            onError: error => tryRefreshToken(error, getNewCards)
        },
    );

    return {isLoading, data, getNewCards}
}

const useAddDeck = () => {
    const queryClient = new QueryClient();
    const {isLoading, mutate: addDeck} = useMutation(
        async (data) => await LearningDeckService.addDeck(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['decks']);
                redirectToLearn();
            },
            onError: error =>
                tryRefreshToken(
                    error,
                    null,
                    () => addDeck(getErrorDataWithoutUserId(error))
                )
        },
    );

    return {isLoading, addDeck}
}

export {useDeck, useCards, useAddDeck}