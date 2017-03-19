ANYENV_SCRIPT = "/etc/profile.d/anyenv.sh"
remote_file ANYENV_SCRIPT do
  source "remote_files/anyenv.sh"
end

execute "install pyenv" do
  command "source #{ANYENV_SCRIPT}; anyenv install pyenv"
end

PYENV_SCRIPT = "/etc/profile.d/pyenv.sh"

remote_file PYENV_SCRIPT do
  source "remote_files/pyenv.sh"
end

execute "set owner and mode for #{PYENV_SCRIPT} " do
  command "chown root: #{PYENV_SCRIPT}; chmod 644 #{PYENV_SCRIPT}"
  user "root"
end

# システム全体でnvm経由でインストールしたnode,jsを使えるように
# NVM_SCRIPT = "/etc/profile.d/nvm.sh"
# # 転送先のパスを指定
# remote_file NVM_SCRIPT do
#   # レシピファイルからの相対パス
#   source "remote_files/nvm.sh"
# end
