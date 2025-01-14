import React from "react";
import { useTranslation } from "react-i18next";

import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { SearchIcon } from "@patternfly/react-icons";

export const StateNoResults: React.FC = () => {
  const { t } = useTranslation();

  return (
    <EmptyState variant={EmptyStateVariant.small}>
      <EmptyStateIcon icon={SearchIcon} />
      <Title headingLevel="h2" size="lg">
        {t("message.noResultsFoundTitle")}
      </Title>
      <EmptyStateBody>{t("message.noResultsFoundBody")}</EmptyStateBody>
    </EmptyState>
  );
};
