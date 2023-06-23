import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {LearningDeckService} from '../services/learningDecksService';
import {LearningCardsService} from '../services/learningCardsService';
import {redirectToLearn} from "../utils";


const useDeck = id => {
    const {isLoading, data} = useQuery(
        ['deck-name', id],
        async () => await LearningDeckService.getDeck(id),
    );

    return {isLoading, data}
};

const useCards = id => {
    const {isLoading, data, refetch: getNewCards} = useQuery(
        ['deck', id],
        async () => await LearningCardsService.getCards(id),
    );

    return {isLoading, data, getNewCards}
}

const useAddDeck = () => {
    const queryClient = useQueryClient();
    const {isLoading, mutate: addDeck} = useMutation(
        async (data) => await LearningDeckService.addDeck(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['decks']);
                redirectToLearn();
            }
        },
    );

    return {isLoading, addDeck}
}

export {useDeck, useCards, useAddDeck}
