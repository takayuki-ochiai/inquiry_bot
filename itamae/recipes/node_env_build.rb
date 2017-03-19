NVM_DIR = "/usr/local/nvm"
NODE_VERSION = "v6.0.0"
# PROFILE = "/home/vagrant/.profile"

git NVM_DIR do
  repository "git://github.com/creationix/nvm.git"
  not_if "test -d #{NVM_DIR}"
end

execute "checkout" do
  cwd NVM_DIR
  command "git checkout `git describe --abbrev=0 --tags`"
end

execute "source" do
  command ". #{NVM_DIR}/nvm.sh"
end

# システム全体でnvm経由でインストールしたnode,jsを使えるように
NVM_SCRIPT = "/etc/profile.d/nvm.sh"
# 転送先のパスを指定
remote_file NVM_SCRIPT do
  # レシピファイルからの相対パス
  source "remote_files/nvm.sh"
end

execute "nvm install 6.0.0" do
  command ". #{NVM_DIR}/nvm.sh; nvm install #{NODE_VERSION}"
end

execute "nvm use stable" do
  command ". #{NVM_DIR}/nvm.sh; nvm use #{NODE_VERSION}"
end

execute "npm global install" do
  command ". #{NVM_DIR}/nvm.sh; npm install -g webpack@1.13.0"
end
