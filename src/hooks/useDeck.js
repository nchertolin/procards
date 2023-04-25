import {QueryClient, useMutation, useQuery} from '@tanstack/react-query'
import {LearningDeckService} from '../services/learningDecksService';
import {LearningCardsService} from '../services/learningCardsService';
import {onError} from './useUser'
import {redirectToLearn} from "../util";


const useDeck = id => {
    const {isLoading, data} = useQuery(
        ['deck-name', id],
        async () => await LearningDeckService.getDeck(id),
        {
            onError
        },
    );

    return {isLoading, data}
};

const useCards = id => {
    const {isLoading, data, refetch: getNewCards} = useQuery(
        ['deck', id],
        async () => await LearningCardsService.getCards(id),
        {
            onError
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
            onError,
        },
    );

    return {isLoading, addDeck}
}

export {useDeck, useCards, useAddDeck}