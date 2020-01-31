import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import mediaqueries from '@styles/media';

interface TagsListProps {
  tags: string[];
}

const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  return (
    <div>
      {tags.map((tag, index) => {
        return (
          <List key={index}>
            <ListItem tag={tag} />
          </List>
        );
      })}
    </div>
  );
};

export default TagsList;

// TODO: I don't know what is better code?! maybe create some interface?
// eg. ITags{tags:[ITag]} & ITag{tag:string, path:string}
function slugify(string, base) {
  const slug = string
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  return `${base}/${slug}`.replace(/\/\/+/g, '/');
}

const ListItem: React.FC<string> = ({ tag }) => {
  // TODO: I don't know what is better code?! maybe create some interface?
  // eg. ITags{tags:[ITag]} & ITag{tag:string, path:string}
  const tagPath = slugify(tag, '/tag');

  // MARK: You can implements better UI.
  return (
    <TagLink to={tagPath}>
      <TagBox>{tag}</TagBox>
    </TagLink>
  );
};

const List = styled.div`
  display: inline-grid;
  max-width: 100%;
`;

const TagLink = styled(Link)`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  height: 100%;
  margin: 4px 4px;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &:hover,
  &:focus {
    color: ${p => p.theme.colors.accent};
  }

  ${mediaqueries.phablet`
    &:active {
      transform: scale(0.97) translateY(3px);
    }
  `}
`;

const TagBox = styled.div`
  color: ${p => p.theme.colors.background};
  background-color: ${p => p.theme.colors.primary};
  border-radius: 1em;
  padding: 0 0.5em;
  display: flow-root;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
