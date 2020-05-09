import addToMailchimp from "gatsby-plugin-mailchimp";
import React, { useState } from "react";

import Section from "@components/Section";
import Headings from "@components/Headings";

import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const Subscription: React.FC<{}> = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    addToMailchimp(email)
      .then(data => {
        if (data.result === "error") {
          throw data;
        }

        setSubscribed(true);
        setEmail("");

        setTimeout(() => {
          setSubscribed(false);
        }, 6000);
      })
      .catch(error => {
        setError(error.msg);
      });
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.currentTarget.value);
    setError("");
  }

  return (
    <Section narrow>
      <SubscriptionContainer>
        <Content>
          <Heading>
            Join our email list and get notified about new content
          </Heading>
          <Text>
            Be the first to receive our latest content with the ability to
            opt-out at anytime. We promise to not spam your inbox or share your
            email with any third parties.
          </Text>
          <Form onSubmit={handleSubmit} hasError={error}>
            <Input
              placeholder="your@email.com"
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              hasError={error}
            />
            <Button
              type="submit"
              hasError={error}
              subscribed={subscribed}
              disabled={subscribed}
            >
              {subscribed ? <CheckMarkIcon /> : "Subscribe"}
            </Button>
            {error && <Error dangerouslySetInnerHTML={{ __html: error }} />}
          </Form>
        </Content>
      </SubscriptionContainer>
    </Section>
  );
};

export default Subscription;

const SubscriptionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 64px 0 55px;
  margin: 10px auto 100px;
  background: ${p => p.theme.colors.card};
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.05);
  z-index: 1;

  ${mediaqueries.tablet`
    padding: 50px 0 0;
    text-align: center;
  `}

  ${mediaqueries.phablet`
    margin: -20px auto 80px;
  `}
`;

const Content = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 640px;

  ${mediaqueries.tablet`
    h3 {
      padding: 0 50px;
    }
  `}

  ${mediaqueries.phone`
    h3 {
      padding: 0 24px;
    }
  `}
`;

const Heading = styled(Headings.h3)`
  margin-bottom: 20px;

  ${mediaqueries.tablet`
    margin-bottom: 15px;
  `}
`;

const Text = styled.p`
  margin: 0 auto 30px;
  color: ${p => p.theme.colors.grey};
  line-height: 1.75;

  ${mediaqueries.tablet`
    padding: 0 26px;
    margin: 0 auto 25px;
  `}
`;

const Form = styled.form<{ hasError: string }>`
  position: relative;

  &::after {
    content: ">";
    position: absolute;
    left: 21px;
    top: 10px;
    color: ${p => (p.hasError ? p.theme.colors.error : p.theme.colors.accent)};

    ${mediaqueries.tablet`
    left: 34px;
    top: 11px;
  `}
  }
`;

const Input = styled.input<{ hasError: string }>`
  position: relative;
  background: ${p =>
    p.hasError
      ? p.theme.colors.errorBackground
      : p.theme.colors.inputBackground};
  border-radius: 35px;
  border: none;
  padding: 13px 21px 13px 35px;
  width: 471px;
  color: ${p => p.theme.colors.primary};

  ::placeholder {
    color: ${p => p.theme.colors.track};
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: ${p => p.theme.colors.track};
  }

  ::-ms-input-placeholder {
    color: ${p => p.theme.colors.track};
  }

  ${mediaqueries.tablet`
    width: calc(100% - 36px);
    margin: 0 18px;
    padding: 14px 14px 14px 30px;
    margin-bottom: 30px;
  `}
`;

const Button = styled.button<{ hasError: string; subscribed: boolean }>`
  position: absolute;
  left: 306px;
  top: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 161px;
  height: 38px;
  border: 1px solid
    ${p => (p.hasError ? p.theme.colors.error : p.theme.colors.accent)};
  color: ${p => (p.hasError ? p.theme.colors.error : p.theme.colors.accent)};
  background: ${p => (p.subscribed ? p.theme.colors.accent : "transparent")};
  font-weight: 600;
  border-radius: 35px;
  letter-spacing: 0.42px;
  transition: border-color 0.2s var(--ease-in-out-quad),
    background 0.2s var(--ease-in-out-quad), color 0.2s var(--ease-in-out-quad);

  &:hover {
    background: ${p =>
      p.hasError ? p.theme.colors.error : p.theme.colors.accent};
    color: ${p => p.theme.colors.background};
  }

  &[disabled] {
    cursor: not-allowed;
  }

  svg * {
    fill: ${p => p.theme.colors.background};
  }

  ${p => mediaqueries.tablet`
    position: relative;
    height: 60px;
    width: 100%;
    top: 0;
    left: 0;
    border: none;
    border-radius: 0;
    border-top: 1px solid ${p.theme.colors.horizontalRule};

    &:hover {
      color: initial;
      background: initial;
    }
  `}
`;

const Error = styled.div`
  position: absolute;
  left: 35px;
  bottom: -20px;
  color: ${p => p.theme.colors.error};
  font-size: 12px;

  a {
    color: ${p => p.theme.colors.error};
    text-decoration: underline;
  }

  ${mediaqueries.tablet`
    left: 50px;
    top: 50px;
  `}
`;

const CheckMarkIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.00016 16.1698L4.83016 11.9998L3.41016 13.4098L9.00016 18.9998L21.0002 6.99984L19.5902 5.58984L9.00016 16.1698Z"
      fill="#08080B"
    />
  </svg>
);
