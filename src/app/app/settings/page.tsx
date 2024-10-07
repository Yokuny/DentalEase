"use client";

import { useEffect, useState, useCallback } from "react";
import { localUser } from "@/helpers/dataManager.helper";
import type { PartialUser } from "@/types";

import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import ProfileForm from "./Form";

const Profile = () => {
  const [user, setUser] = useState<PartialUser | null>(null);

  const { toast } = useToast();
  const handlRequestResponse = useCallback(
    (title: string, message: string) => toast({ title: title, description: message }),
    [toast]
  );

  useEffect(() => {
    const requestUser = async () => {
      const userData = await localUser();
      setUser(userData);
    };
    requestUser();
  }, []);

  return (
    <div className="space-y-6 lg:max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">Perfil</h3>
        <p className="text-sm text-muted-foreground">Edite seu perfil e ajuste suas configurações de conta.</p>
      </div>
      <Separator />
      <ProfileForm user={user} toast={handlRequestResponse} />
    </div>
  );
};

export default Profile;
