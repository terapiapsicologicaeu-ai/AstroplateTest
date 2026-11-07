import config from "@/config/config.json";
import { DiscussionEmbed } from "disqus-react";
import React, { type ComponentProps } from "react";

const Disqus = ({ className }: { className?: string }) => {
  const { disqus } = config;
  // The `settings` object is optional: Sveltia may omit it when the CMS saves
  // the config. Fall back to an empty object so the build keeps working.
  const settings =
    (disqus as { settings?: ComponentProps<typeof DiscussionEmbed>["config"] })
      .settings ?? {};

  return (
    <div className={className}>
      {disqus.enable && (
        <DiscussionEmbed shortname={disqus.shortname} config={settings} />
      )}
    </div>
  );
};

export default Disqus;
