import {useMutation, useQuery} from '@tanstack/react-query';
import {LearningCardsService} from '../services/learningCardsService';
import {EditorCardsService} from '../services/editorCardsService';
import {tryRefreshToken} from "../services/authService";
import {getErrorDataWithoutUserId} from "../util";

const useGrade = nextCard => {
    const {isLoading, mutate: postGrade} = useMutation(
        async data => await LearningCardsService.postGrade(data),
        {
            onSuccess: () => nextCard(),
            onError: error =>
                tryRefreshToken(
                    error,
                    null,
                    () => postGrade(getErrorDataWithoutUserId(error))
                )
        }
    );

    return {isLoading, postGrade};
};

const useImages = (deckId, card) => {
    const {isLoading, data: front} = useQuery(
        ['front', deckId, card],
        async () => await EditorCardsService.getImage({deckId, cardId: card.id, side: true}),
        {
            onError: () => {
                // tryRefreshToken(error, getFrontImage);
                console.clear();
            }
        }
    );

    const {isLoading: isLoading1, data: back} = useQuery(
        ['back', deckId, card],
        async () => await EditorCardsService.getImage({deckId, cardId: card.id, side: false}),
        {
            onError: () => {
                // tryRefreshToken(error, getBackImage);
                console.clear();
            }
        }
    );

    return {isLoading: isLoading || isLoading1, images: [front, back]}
}

export {useGrade, useImages};