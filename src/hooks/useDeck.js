import {QueryClient, useMutation, useQuery} from '@tanstack/react-query'
import {testData} from '../testData'
import {LearningDeckService} from '../services/learningDecksService';
import {LearningCardsService} from '../services/learningCardsService';
import {onError} from './useUser'
import {redirectToLearn} from "../util";


const useDeck = id => {
    const testDeck = testData.decks[0];
    const testDeckWithoutCards = {...testDeck};
    delete testDeckWithoutCards.cards

    const {isLoading, data} = useQuery(
        ['deck-name', id],
        async () => await LearningDeckService.getDeck(id),
        {
            onError,
            // initialData: testDeckWithoutCards
        },
    );

    return {isLoading, data}
};

const useCards = id => {
    // const testDeck = testData.decks[0];
    const {isLoading, data, refetch: getNewCards} = useQuery(
        ['deck', id],
        async () => await LearningCardsService.getCards(id),
        {
            onError,
            //  initialData: {
            //     deckName: testDeck.deckName,
            //     cards: testDeck.cards
            //  }
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