import * as Linking from 'expo-linking';

export const useHandleLink = () => {
  const handleGithubLink = () => {
    const githubUrl = 'https://github.com/andrew-bierman/PackRat';
    handleLink(githubUrl);
  };

  const handleDiscordLink = () => {
    const discordUrl = 'https://discord.gg/jFUuYBTXfY';
    handleLink(discordUrl);
  };

  const handleLink = (url) => {
    Linking.openURL(url);
  };
  return {
    handleGithubLink,
    handleDiscordLink,
  };
};
export default useHandleLink;
