import React from 'react';
import styled from '@emotion/styled';

import Icons from '@icons';
import Anchor from '@components/Anchor';

type Props = {
  title: string;
  isDark: boolean;
  link: string;
  sectionKey: string;
  openSection: string;
  children: React.Node;
  hasArticles: boolean;
  onClick: (string) => void;
};
function SideMenuSection(props: Props) {
  const hasArticles = props.hasArticles === true;
  const isOpen = props.openSection === props.sectionKey;
  return (
    <Container isOpen={isOpen}>
      <TopContainer>
        <SectionContainer onClick={() => props.onClick(props.sectionKey)}>
          {hasArticles ? (
            props.title
          ) : (
            <Anchor href={props.link}>{props.title}</Anchor>
          )}
        </SectionContainer>
        {hasArticles && (
          <ChevronContainer isOpen={isOpen}>
            <Icons.ChevronLeft fill={props.isDark ? '#fff' : '#08080B'} />
          </ChevronContainer>
        )}
      </TopContainer>
      {hasArticles && <Divider />}
      {hasArticles && (
        <ChildContainer isOpen={isOpen}>{props.children}</ChildContainer>
      )}
    </Container>
  );
}

export default SideMenuSection;

const Container = styled.div<{ isOpen: boolean }>`
  background-color: ${p => (p.isOpen ? p.theme.colors.card : 'transparent')};
  border-radius: 4px;
  margin-top: 8px;
`;

const TopContainer = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${p => p.theme.colors.card};
  }
`;

const SectionContainer = styled.div`
  cursor: pointer;
  padding: 16px 0px 16px 8px;
  font-size: 20px;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 4px;
  flex: 1;
  color: ${p => p.theme.colors.articleText};
`;

const ChildContainer = styled.div<{ isOpen: boolean }>`
  max-height: ${p => (p.isOpen ? '500px' : '0px')};
  overflow: hidden;
  padding-left: 8px;
  transition: max-height 0.3s ease;
  background-color: ${p => p.theme.colors.card};
  border-radius: 4px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${p => p.theme.colors.background};
`;

const ChevronContainer = styled.div<{ isOpen: boolean }>`
  transform: ${p => (p.isOpen ? 'rotateZ(90deg)' : 'rotateZ(-90deg)')};
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 4px;
  transition: transform 0.3s ease;
`;
