import {memo, useContext} from 'react'
import styled from 'styled-components';
import {Context} from "../Home/Context";
import CollectionsStorage from "../DataAPI/CollectionsStorage";

const CurrentCollection = () => {
    const context = useContext(Context)

    return (
        <CollectionName>
            {CollectionsStorage.getCollectionNameByKey(context.currentCollectionKey)}
        </CollectionName>
    )
}

const CollectionName = styled.div`
    font-size: 24px;
    color: #16C076;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

export default memo(CurrentCollection);