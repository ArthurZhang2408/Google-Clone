import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useResultContext } from './contexts/ResultContextProvider';
import { Loading } from './Loading';

export const Results = () => {
    const { results, isLoading, getResults, searchTerm } = useResultContext();
    const location = useLocation();

    useEffect(() => {
        if(searchTerm) {
            if(location.pathname === '/videos') {
                getResults(`/?query=${searchTerm} videos`);
            } else if(location.pathname === '/search'){
                getResults(`?query=${searchTerm}&num=40`)
            } else if(location.pathname === '/images'){
                getResults(`/search_image?query=${searchTerm}&num=40`)
            }
        }
    }, [searchTerm, location.pathname]);

    if(isLoading) return <Loading />;

    console.log(results);
    switch (location.pathname) {
        case '/search':
            return (
                <div className="flex flex-wrap justify-between space-y=6 sm:px-56">
                    {results?.results?.map(({ url, title, description }, index) => (
                        <div key={index} className="md:w-2/5 w-full">
                            <a href={url} target="_blank" rel="noreferrer">
                                <p className="text-sm">
                                    {url.length > 30 ? url.substring(0, 30) : url}
                                </p>
                                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                                    {title}
                                </p>
                                <p className='text-sm'>
                                    {description}
                                </p>
                            </a>
                        </div>
                    ))}
                </div>
            );
        case '/images':
            return (
                <div className="flex flex-wrap justify-center items-center">
                    {results?.map(({ image, link: { href, title }}, index) => (
                        <a className="sm:p-3 p-5" href={href} key={index} target="_blank" rel="noreferrer">
                            <img src={image?.src} alt={title} loading="lazy" />
                            <p className="w-36 break-words text-sm mt-2">
                                {title}
                            </p>
                        </a>
                    ))}
                </div>
            );
        case '/news':
            return 'SEARCH';
        case '/videos':
            return 'SEARCH';

        default:
            return 'ERROR!';
    }
};
