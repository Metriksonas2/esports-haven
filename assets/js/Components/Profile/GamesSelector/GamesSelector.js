import React from 'react';

import Select from 'react-select';

export default ({ games, selectedGames}) => (
    <Select
        defaultValue={selectedGames}
        isMulti
        name="colors"
        options={games}
        className="basic-multi-select"
        classNamePrefix="select"
    />
);