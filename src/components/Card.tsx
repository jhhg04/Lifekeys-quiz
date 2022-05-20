import React from 'react';
import {AnswerObject} from '../App';
import {Wrapper, ButtonWrapper} from './Card.styles';

type Props = {
    question:string;
    answers:string[];
    cb: (e:React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer:AnswerObject | undefined;
    questionNum:number;
    questionsTotal:number;
}

const Card: React.FC<Props> = ({question,answers,cb,userAnswer,questionNum,questionsTotal}) => {
    return (
        <Wrapper>
            <p className="question-num">Question {questionNum + 1}/{questionsTotal}</p>
            <p dangerouslySetInnerHTML={{__html: question}} ></p>
            <div className="answers">
                {answers.map(answer => (
                    <ButtonWrapper key={answer} correct={userAnswer?.correctAnswer === answer} userClicked={userAnswer?.answer === answer}>
                        <button disabled={userAnswer ? true : false} value={answer} onClick={cb}>
                            <span dangerouslySetInnerHTML={{__html: answer}}></span>
                        </button>
                    </ButtonWrapper>
                ))}
            </div>
        </Wrapper>
    )
}

export default Card;
