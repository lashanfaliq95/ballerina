/**
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import Plugin from 'core/plugin/plugin';
import { CONTRIBUTIONS } from 'core/plugin/constants';

import { REGIONS } from 'core/layout/constants';

import CodeExplorerPanel from './views/CodeExplorerPanel';


import { PLUGIN_ID, VIEWS as VIEW_IDS } from './constants';

class DeviceTypePlugin extends Plugin {
    /**
     * @inheritdoc
     */
    getID() {
        return PLUGIN_ID;
    }

    /**
     * @inheritdoc
     */
    getContributions() {
        const { VIEWS } = CONTRIBUTIONS;
        return {
            [VIEWS]: [
                {
                    id: VIEW_IDS.DEVICE_TYPE_PANEL,
                    component: CodeExplorerPanel,
                    propsProvider: () => {
                        const activeEditor = this.appContext.editor.getActiveEditor();
                        let ast = {};

                        if (activeEditor && activeEditor.file && activeEditor.file.props.ast) {
                            ast = activeEditor.file.props.ast;
                        }
                        return {
                            codeExplorerPlugin: this,
                            ast,
                        };
                    },
                    region: REGIONS.LEFT_PANEL,
            // region specific options for left-panel views
                    regionOptions: {
                        activityBarIcon: 'outline',
                        panelTitle: 'Outline',
                        panelActions: [

                        ],
                    },
                    displayOnLoad: true,
                },
            ],
        };
    }


}

export default DeviceTypePlugin;
