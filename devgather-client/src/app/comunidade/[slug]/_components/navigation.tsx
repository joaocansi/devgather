"use client";

import { Button, Card, CardBody, Divider, Tab, Tabs } from "@heroui/react";
import Image from "next/image";

export default function CommunityNavigation() {
  return (
    <Tabs>
      <Tab key="eventos" title="Evento">
        <div className="mt-4">
          <h4 className="mb-2 text-lg">Próximo Evento</h4>
          <Divider />
          <div className="flex flex-col gap-2">
            <Card className="mt-8">
              <CardBody>
                <h4 className="text-2xl font-bold">Conferência 2025</h4>
                <p>Rio de Janeiro, RJ</p>
                <p>
                  <span className="font-medium">Data:</span> 11/03/2025
                </p>
                <p className="my-2">
                  Neste evento, você poderá fazer networking com centenas de
                  devs ao redor do Rio de Janeiro. Lembre-se: compartilhar
                  conhecimento é o nosso principal mantra.
                </p>
                <Button color="primary" variant="faded">
                  <Image
                    alt="Sign in with google"
                    height={20}
                    src="/google.webp"
                    width={20}
                  />
                  Adicionar no calendário
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </Tab>
      <Tab key="projetos" title="Projetos" />
      <Tab key="redes" title="Redes Sociais" />
    </Tabs>
  );
}
