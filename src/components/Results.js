import React from 'react';
import Result from './Result'

                //{ results} --> trying to distructuring the parameter
function Results({ results, openPopup }) {
    //we use map function to map the results and use key={result.imbID}
    return (
        <section className="results">
            
            {results.map(result => (
                <Result key={result.imdbID} result={result} openPopup={openPopup} />
            ))}
        </section>
    )
}

export default Results
