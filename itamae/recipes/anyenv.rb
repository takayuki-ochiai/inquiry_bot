ANYENV_DIR = "/usr/local/anyenv"
ANYENV_SCRIPT = "/etc/profile.d/anyenv.sh"

git ANYENV_DIR do
  repository "git://github.com/riywo/anyenv.git"
end

execute "mkdir #{ANYENV_DIR}/shims #{ANYENV_DIR}/versions"

remote_file ANYENV_SCRIPT do
  source "remote_files/anyenv.sh"
end

execute "set owner and mode for #{ANYENV_SCRIPT} " do
  command "chown root: #{ANYENV_SCRIPT}; chmod 644 #{ANYENV_SCRIPT}"
  user "root"
end

execute "mkdir #{ANYENV_DIR}/plugins" do
  not_if "temp -d #{ANYENV_DIR}/plugins"
end

git "#{ANYENV_DIR}/plugins/anyenv-update" do
  repository "git://github.com/znz/anyenv-update.git"
end

git "#{ANYENV_DIR}/plugins/anyenv-git" do
  repository "git://github.com/znz/anyenv-git.git"
end
