import {autocomplete, getAlgoliaResults} from '@algolia/autocomplete-js';
import algoliasearch from "algoliasearch";

const searchClient = algoliasearch(
    '21UFF9B57O',
    'cd878a15661d10180ac3383e1cf1d806'
);

autocomplete({
    container: '#autocomplete',
    placeholder: 'Search for posts',
    getSources({ query }) {
        return [
            {
                sourceId: 'products',
                getItems() {
                    return getAlgoliaResults({
                        searchClient,
                        queries: [
                            {
                                indexName: 'prod_POSTS',
                                query,
                                params: {
                                    hitsPerPage: 5,
                                    attributesToSnippet: ['title:10', 'description:35'],
                                    snippetEllipsisText: '…',
                                },
                            },
                        ],
                    });
                },
                templates: {
                    item({ item, createElement }) {
                        return createElement("a", {
                            href: item.url,
                            className: "autocomplete__item",
                            innerText: item.title.replace( /(<([^>]+)>)/ig, '')
                        })
                    },
                },
            },
        ];
    },
});