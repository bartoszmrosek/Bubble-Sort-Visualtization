import React, { useEffect, useState } from 'react';
import { SortingStatus } from '../../types/SortingStatus';
import './Visualization.css';
import generateRandomInt from '../../utils/generateRandomIntWIthExclude';

interface VisualtizationProps {
  setSortingStatus: React.Dispatch<React.SetStateAction<SortingStatus>>;
  sortingStatus: SortingStatus;
  newSetTrigger: number;
}

const Visualization = ({
  setSortingStatus,
  sortingStatus,
  newSetTrigger,
}: VisualtizationProps) => {
  let timer: NodeJS.Timer | null = null;
  const [randomArrayToSort, setRandomArrayToSort] = useState<
    ['finished' | 'not finished', ...number[]]
  >(['not finished']);

  const createNewSet = () => {
    const newSetOfValues: number[] = [];
    const lengthOfNewSet = generateRandomInt(15, 30);
    for (let i = lengthOfNewSet; i > 0; i--) {
      newSetOfValues.push(generateRandomInt(1, 200, newSetOfValues));
    }

    setRandomArrayToSort(['not finished', ...newSetOfValues]);
  };

  const bubbleSort = () => {
    // In this function typescript have problem with
    // infering proper types for tuple since the use of 'as', I am sure that the values will be numbers even if typescript is not so sure
    setRandomArrayToSort(
      (currArr): ['finished' | 'not finished', ...number[]] => {
        for (let i = 1; i < currArr.length; i++) {
          if (currArr[i] > currArr[i + 1]) {
            return [
              'not finished',
              ...currArr.slice(1, i),
              currArr[i + 1],
              currArr[i],
              ...currArr.slice(i + 2),
            ] as ['not finished', ...number[]];
          }
        }
        return ['finished', ...currArr.slice(1)] as ['finished', ...number[]];
      },
    );
  };

  useEffect(() => {
    createNewSet();
    if (timer) clearInterval(timer);
  }, [newSetTrigger]);

  useEffect(() => {
    if (sortingStatus === 'solving') {
      timer = setInterval(() => {
        bubbleSort();
      }, 50);
    } else {
      if (timer) clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [sortingStatus]);

  useEffect(() => {
    if (randomArrayToSort[0] === 'finished') {
      setSortingStatus('solved');
    }
  }, [randomArrayToSort]);

  return <div className="Visualtization--wrapper"></div>;
};

export default Visualization;
