import React from "react";
import { Button, Icon } from "semantic-ui-react";

export default function HomeUser({ user, disconnect, saveUser }) {

    return (
      <>
        <h3>Bonjour {user.name}</h3>
        <div>
          <Button animated onClick={disconnect}>
            <Button.Content visible>Se déconnecter</Button.Content>
            <Button.Content hidden>
              <Icon name="user close" />
            </Button.Content>
          </Button>
          <span style={{ cursor: "pointer" }}>
          </span>
        </div>
      </>
    );
  }
  