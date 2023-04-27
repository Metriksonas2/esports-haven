import React, {useState} from 'react';

import Select from 'react-select';

const GamesSelector = ({ games, selectedGames, onChange }) => {
    const onChangeHandler = (selectedOptions) => {
        onChange(selectedOptions);
    }

    return (
        <Select
            defaultValue={selectedGames}
            isMulti
            name="colors"
            options={games}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={onChangeHandler}
        />
    );
};

export default GamesSelector;